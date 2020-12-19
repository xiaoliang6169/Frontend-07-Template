LL算法构建AST | 四则运算

```
<Expression> ::= <AdditiveExpression><EOF>

<AdditiveExpression> ::= 
    <MultiplicativeExpression>
    | <AdditiveExpression><+><MultiplicativeExpression>
    | <AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression> ::=
    <Number>
    | <MultiplicativeExpression><*><Number>
    | <MultiplicativeExpression></><Number>
```

第一次接触语法分析、词法分析；视频看了3遍，慢慢理解了课程内容。又成长了一步，加油。

