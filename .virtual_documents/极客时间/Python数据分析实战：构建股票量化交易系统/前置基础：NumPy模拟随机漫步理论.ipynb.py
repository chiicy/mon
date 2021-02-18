import matplotlib.pyplot as plt#导入模块
import random
walk = []
for _ in range(1000):
    walk.append(random.normalvariate(0,1))
plt.hist(walk, bins=30)#bins直方图的柱数 
plt.show() 


from notebook.auth import passwd
passwd()





