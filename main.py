#!/usr/bin/env python
# coding: utf-8

# In[159]:


import numpy as np
import pandas as pd
from sklearn import linear_model
from firebase import firebase


# In[160]:


firebase = firebase.FirebaseApplication('https://ihack-70e99.firebaseio.com/')
moisture = firebase.get('/Moisture',None)
temperature = firebase.get('/Temperature',None)
pred = firebase.get('/Year',None)

print(moisture, temperature, pred)


# In[161]:


df=pd.read_csv("crop.csv")





# In[164]:


g=df.groupby('crop')


# In[165]:


#print(g)


# In[166]:


for crop,crop_df in g:
    print(crop)
    print(crop_df)


df_cotton=g.get_group('COTTON')
df_maize=g.get_group('MAIZE')
df_onion=g.get_group('ONION')
df_pepper=g.get_group('PEPPER')
df_pulses=g.get_group('PULSES')
df_soyabean=g.get_group('SOYABEAN')
df_tea=g.get_group('TEA')
df_wheat=g.get_group('WHEAT')


# In[168]:


pred=np.asarray(2019).reshape(1,-1)


# ## Cotton

# In[169]:


ct=linear_model.LinearRegression()


# In[170]:


cot_year = np.asarray(df_cotton['year']).reshape(-1,1)
cot_cost = np.asarray(df_cotton['cost']).reshape(-1,1)


# In[171]:


ct.fit(cot_year,cot_cost)


# In[172]:


cotton_price=ct.predict(pred)


# ## Maize

# In[173]:


mz=linear_model.LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None,
         normalize=True)


# In[174]:


maz_year = np.asarray(df_maize['year']).reshape(-1,1)
maz_cost = np.asarray(df_maize['cost']).reshape(-1,1)


# In[175]:


mz.fit(maz_year,maz_cost)


# In[176]:


maize_price=mz.predict(pred)


# ## Onion

# In[177]:


on=linear_model.LinearRegression()


# In[178]:


on_year = np.asarray(df_onion['year']).reshape(-1,1)
on_cost = np.asarray(df_onion['cost']).reshape(-1,1)


# In[179]:


on.fit(on_year,on_cost)


# In[180]:


onion_price=on.predict(pred)


# ## Pepper

# In[181]:


pp=linear_model.LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None,
         normalize=True)


# In[182]:


pp_year = np.asarray(df_pepper['year']).reshape(-1,1)
pp_cost = np.asarray(df_pepper['cost']).reshape(-1,1)


# In[183]:


pp.fit(pp_year,pp_cost)


# In[184]:


pepper_price=pp.predict(pred)


# ## Pulses

# In[185]:


pl=linear_model.LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None,
         normalize=True)


# In[186]:


pl_year = np.asarray(df_pulses['year']).reshape(-1,1)
pl_cost = np.asarray(df_pulses['cost']).reshape(-1,1)


# In[187]:


pl.fit(pl_year,pl_cost)


# In[188]:


pulses_price=pl.predict(pred)


# ## Soyabean

# In[189]:


sb=linear_model.LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None,
         normalize=True)


# In[190]:


sb_year = np.asarray(df_soyabean['year']).reshape(-1,1)
sb_cost = np.asarray(df_soyabean['cost']).reshape(-1,1)


# In[191]:


sb.fit(sb_year,sb_cost)


# In[192]:


soyabean_price=sb.predict(pred)


# ## Tea

# In[193]:


tea=linear_model.LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None,
         normalize=True)


# In[194]:


tea_year = np.asarray(df_tea['year']).reshape(-1,1)
tea_cost = np.asarray(df_tea['cost']).reshape(-1,1)


# In[195]:


tea.fit(tea_year,tea_cost)


# In[196]:


tea_price=tea.predict(pred)


# ## Wheat

# In[197]:


wh=linear_model.LinearRegression(copy_X=True, fit_intercept=True, n_jobs=None,
         normalize=True)


# In[198]:


wh_year = np.asarray(df_wheat['year']).reshape(-1,1)
wh_cost = np.asarray(df_wheat['cost']).reshape(-1,1)


# In[199]:


wh.fit(wh_year,wh_cost)


# In[200]:


wheat_price=wh.predict(pred)


# In[201]:


lst=[cotton_price,maize_price,onion_price,pepper_price,pulses_price,soyabean_price,tea_price,wheat_price]


# In[ ]:





# In[204]:


print(moisture, temperature, pred)


# In[205]:


crops = []


# In[206]:


if(moisture > 70 and temperature > 32):
    crops.append(["wheat",wheat_price])
    crops.append(["maize",maize_price])
    crops.append(["soybean",soyabean_price])
    print(crops)


# In[207]:


if(moisture > 70 and temperature < 32):
    crops.append(["tea",tea_price])
    crops.append(["cotton",cotton_price])

    print(crops)


# In[208]:


if(moisture < 70 and temperature < 32):
    crops.append(["pepper",pepper_price])
    crops.append(["pulses",pulses_price])
    crops.append(["onions",onions_price])
    print(crops)


# In[ ]:





# In[ ]:
