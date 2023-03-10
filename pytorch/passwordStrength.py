from funcs import *
import pandas as pd
import torch
from torch import nn
import sys

length = lambda x:cal_len(x)
capital = lambda x:cal_capL(x)
small = lambda x:cal_smL(x)
special = lambda x:cal_spc(x)
numeric = lambda x:cal_num(x)

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

loaded_model_0 = PasswordModelV1(5, 3, 16)
loaded_model_0 = torch.load("model_1.pth")
loaded_model_0.eval()

def tester(password):
    data = pd.DataFrame([password], columns=['password'])
    data['length']=pd.DataFrame(data.password.apply(length))
    data['capital']=pd.DataFrame(data.password.apply(capital))
    data['small']=pd.DataFrame(data.password.apply(small))
    data['special']=pd.DataFrame(data.password.apply(special))
    data['numeric']=pd.DataFrame(data.password.apply(numeric))
    data = data.drop(['password'], axis=1)
    data = torch.tensor(data.values, dtype=torch.float)
    output = loaded_model_0(data)

    if output[0][0] > output[0][1] and output[0][0] > output[0][2]:
        return "Weak"
    if output[0][1] > output[0][0] and output[0][1] > output[0][2]:
        return "Medium"
    if output[0][2] > output[0][0] and output[0][2] > output[0][1]:
        return "Strong"


print(tester(sys.argv[1]))
