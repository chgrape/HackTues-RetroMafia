import pandas as pd
import numpy as np
import torch
from torch import nn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import re
import matplotlib.pyplot as plt

data = pd.read_csv("data.csv", error_bad_lines=False)
print(data.head())

data=data.dropna(axis=0)
data['password']=data['password'].astype('str')

def cal_len(x):
    '''
    Calculates the length of a given password.
    '''
    x=str(x)
    return len(x)

def cal_capL(x):
    '''
    Calculates the number of capital letters in the password.
    '''
    x=str(x)
    cnt=0
    for i in x:
        if(i.isupper()):
            cnt+=1
    return cnt

def cal_smL(x):
    '''
    Calculates the nu,ber of small letters in the password.
    '''
    x=str(x)
    cnt=0
    for i in x:
        if(i.islower()):
            cnt+=1
    return cnt

def cal_spc(x):
    '''
    Calculates the number of special characters in the password.
    '''
    x=str(x)
    return (len(x)-len(re.findall('[\w]',x)))

def cal_num(x):
    '''
    Calculates the number of numeric values in the password.
    '''
    x=str(x)
    cnt=0
    for i in x:
        if(i.isnumeric()):
            cnt+=1
    return cnt

length=lambda x:cal_len(x)
capital=lambda x:cal_capL(x)
small=lambda x:cal_smL(x)
special=lambda x:cal_spc(x)
numeric=lambda x:cal_num(x)

data['length']=pd.DataFrame(data.password.apply(length))
data['length']=pd.DataFrame(data.password.apply(capital))
data['small']=pd.DataFrame(data.password.apply(small))
data['special']=pd.DataFrame(data.password.apply(special))
data['numeric']=pd.DataFrame(data.password.apply(cal_num))

data.to_csv('processed.csv',index=None)

with open("processed.csv") as f_input:
    text = [line.strip().split() for line in f_input.readlines()]

text = [line[0].split(",") for line in text]
text = [line[1:] for line in text]

text = [",".join(line) for line in text]

array = np.loadtxt(text, skiprows=1, delimiter=",", dtype=np.float32)

y_arr, X_arr = array[:, :1], array[:, 1:]

X_passwords = torch.from_numpy(X_arr).type(torch.float)
y_passwords = torch.from_numpy(y_arr).type(torch.float)

y_passwords = y_passwords.view(-1,1)

y_passwords = torch.cat((y_passwords, torch.zeros_like(y_passwords)), dim=1)
y_passwords = torch.cat((y_passwords, torch.zeros_like(y_passwords)), dim=1)

for i in range(len(y_passwords)):
    if y_passwords[i][0] == 0:
        y_passwords[i][0] = 1
    if y_passwords[i][0] == 1:
        y_passwords[i][1] = 1
    if y_passwords[i][0] == 2:
        y_passwords[i][2] = 1


y_passwords = y_passwords[:, 1:]

X_train, X_test, y_train, y_test = train_test_split(X_passwords, y_passwords, test_size=0.2, random_state=42)


class PasswordModelV1(nn.Module):
    def __init__(self, in_units, out_units, hidden_units):
        super().__init__()
        self.layer_stack = nn.Sequential(
            nn.Linear(in_units, hidden_units),
            nn.Linear(hidden_units, hidden_units),
            nn.Linear(hidden_units, out_units)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.layer_stack(x)


model = PasswordModelV1(5, 3, 16)

loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

def accuracy_fn(y_true, y_pred):
    y_true = y_true.argmax(dim=1)
    y_pred = y_pred.argmax(dim=1)
    return torch.sum(y_true == y_pred).item() / len(y_true)


torch.manual_seed(42)

epochs = 100

for epoch in range(epochs):
    model.train()
    train_logits = model(X_train)
    train_preds = torch.softmax(train_logits, dim=1)

    loss = loss_fn(train_logits, y_train)
    acc = accuracy_fn(y_train, train_preds)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    model.eval()

    with torch.inference_mode():
        test_logits = model(X_test)
        test_preds = torch.softmax(test_logits, dim=1)

        test_loss = loss_fn(test_logits, y_test)
        test_acc = accuracy_fn(y_test, test_preds)

    if epoch % 10 == 0:
        print(
            f"Epoch: {epoch} | Loss: {loss:.5f} | Acc: {acc:.2f}% | Test loss: {test_loss:.5f} | Test acc: {test_acc:.2f}%")
