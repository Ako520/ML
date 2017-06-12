## 机器学习

### trainer的学习

#### trainer

```javascript
trainer.train(trainingSet, {
  rate: (iterations, error) => {
    console.log("开始啦")
    return 0.1
  },
  iterations: 20000,
  error: .005,
  shuffle: true,
  log: 1000,
  cost: Trainer.cost.CROSS_ENTROPY
})
```

trainer.train第二个参数可以设置各种参数

其中
* rate: 训练网络的学习率。它可以是一个静态速率（只是一个数字），动态（一个数组，它将根据迭代次数从一个转换到下一个数组）或一个回调函数：(iterations, error) => rate。
* iterations: 最大迭代次数
* error: 最小错误
* shuffle: 如果为真，训练集在每次迭代之后都被洗牌，这对于训练数据序列是有用的，这些序列对于具有上下文记忆的网络（如LSTM）是无意义的。
* log：这个命令训练者来控制console.log每X次迭代的错误和迭代次数。
* cost: 您可以设置为使用什么样的代价函数的训练，有三个内置的成本函数（Trainer.cost.CROSS_ENTROPY，Trainer.cost.MSE和Trainer.cost.BINARY）从交叉熵来选择或均方误差。您还可以使用自己的成本函数（targetValues，outputValues）。
* schedule: 您可以创建定制的计划任务,将每个X数量的迭代执行。它可以被用来创建自定义日志或计算分析基于数据传递给任务(数据对象包括错误、迭代和当前学习速率)。如果任务的返回值是正确的,培训将会中止。这可以用来创建特殊条件停止训练(即如果错误开始增加)。
