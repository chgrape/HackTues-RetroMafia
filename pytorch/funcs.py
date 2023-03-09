import re

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