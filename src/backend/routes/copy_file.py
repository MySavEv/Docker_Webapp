import os
import shutil
import re

name = ['OrderDetail','Ingredient','Stock_Ingredient','Withdraw_History','Order','Employee','Coupon','Customer','Member','Payment','Menu_Ingredeint','Stock_Management','AuthEmployee',
        'AuthMember','MemPon']

for filename in name:
    shutil.copy2('./r_menu.js',f'./r_{filename}.js')