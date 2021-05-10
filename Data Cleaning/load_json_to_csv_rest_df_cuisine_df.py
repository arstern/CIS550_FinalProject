# -*- coding: utf-8 -*-
"""Copy_of_Load_JSON_To_CSV.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1aX9iPTrs--Qv9vd_c68O0tscB2PAHptd

#CIS 550 Project
#Load JSON file into CSV format for DB upload

##Create Restaurants Table
"""

#CIS 550 Project
#load JSON file into CSV format for DB upload

#read in the data from the shared CIS 550 folder

#first mount the drive
from google.colab import drive
drive.mount('/content/drive')

#upload the files

import json
from tqdm import tqdm_notebook
#add path variables to list. read from my drive. 
path_list=['/content/drive/MyDrive/CIS_550_Final_Project_Data/Copy of data.txt','/content/drive/MyDrive/CIS_550_Final_Project_Data/Copy of data2.txt','/content/drive/MyDrive/CIS_550_Final_Project_Data/Copy of data3.txt','/content/drive/MyDrive/CIS_550_Final_Project_Data/Copy of data4.txt']

#initialize list of json
list_of_json=[]
#iterate through paths to open the 
for path in path_list:
  with open(path) as json_file:
    data = json.load(json_file)
    list_of_json.append(data)

#take a look at list of json to make sure
print(list_of_json[0][0]) #works

import pandas as pd
rest_df=pd.DataFrame()
rest_df_1=pd.json_normalize(list_of_json[0])
rest_df_2=pd.json_normalize(list_of_json[1])
rest_df_3=pd.json_normalize(list_of_json[2])
rest_df_4=pd.json_normalize(list_of_json[3])
#CRASHES RAM
# for i in range(0,4):
#   this_rest_df=pd.json_normalize(list_of_json[i])
#   rest_df=pd.concat([rest_df,this_rest_df],axis=0)
  #rest_df=pd.concat([flattened_df,this_rest_df],axis=0)#concatenate the flattened dfs

rest_df_4.info()

rest_df=pd.DataFrame()

#split this up because RAM crashed..,
rest_df=pd.concat([rest_df, rest_df_1],axis=0)#concatenate the flattened dfs

rest_df.info()

rest_df=pd.concat([rest_df, rest_df_2],axis=0)#concatenate the flattened dfs

rest_df.info()

rest_df=pd.concat([rest_df, rest_df_3],axis=0)#concatenate the flattened dfs

rest_df.info()

rest_df=pd.concat([rest_df, rest_df_4],axis=0)#concatenate the flattened dfs

rest_df.info()

rest_df.head()

#drop the not needed columns
restaurants_df=rest_df.drop(columns=['cuisines','menus','last_updated'])

#export restaurants df to csv
restaurants_df.to_csv('/content/drive/MyDrive/CIS_550_Final_Project_Data/rest_df.csv',index=False)

restaurants_df.info()

#create the cusines df
cusines_df=rest_df[['cuisines','restaurant_id']]

#explode the cusines column
cusines_df=cusines_df.explode('cuisines')

cusines_df.head()

cusines_df.info()

#export cusines_df as csv
#export restaurants df to csv
cusines_df.to_csv('/content/drive/MyDrive/CIS_550_Final_Project_Data/cusines_df.csv',index=False)

#normalize json into csv schema desired for restaruants table
import pandas as pd

#can use this for loop below to get the menu section of the json flattened

#start with the first element in the list_of_json
flattened_df=pd.DataFrame()
for i in range(0,len(list_of_json[0])):
  #I have no reason to believe that cohort id or instiution will be of any predictive value so we will discard those values
  df=pd.json_normalize(list_of_json[0][i]['menus'])#index the patient profile list appropriately and flatten
  flattened_df=pd.concat([flattened_df,df],axis=0)#concatenate to build the patient_profile dataframe

flattened_df.head()

#export .csvs