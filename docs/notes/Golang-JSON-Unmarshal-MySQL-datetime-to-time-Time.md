# Golang JSON Unmarshal MySQL datetime to time.Time

**json.Unmarshal** uses RFC3339 to decode MySQL datetime type into time.Time.

### Json snippet

#### Right


```
    "Datetime": "2017-07-06T17:27:00Z"
```



#### Wrong


```
    "Datetime": "2017-07-06 17:27:00"
```



or


```
    "Datetime": "2017-07-06T17:27:00"
```



### Reference

  1. [json.Unmarshal uses RFC3339 to decode datetime but why mine is not working?](https://groups.google.com/forum/#!topic/golang-nuts/lNWBkqo0O6s)
