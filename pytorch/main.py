import pandas as pd
import numpy as np
import torch
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

