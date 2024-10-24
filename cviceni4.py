def my_range(start, stop, step):

    result = []
    value = start
    while value < stop:
        value.append(value)
        value += step
    return result

def my_enumerate(iterable, start=0):
    #return[(0,"a"), (1,"b"), (2,"c")]

    result = []
    index = start
    for value in iterable:
        result.append((index, value))
        index += 1
    return result 

def while_enumerat(iterable, start=0):
    result = []
    i = 0 
    while i <len(iterable, start = 0):
        result

def my_zip(*iterables):
    results = []
    length = len(iterables[0])
    for i in rangde(0,leght):
        subresult.append(iterables[i])

    
    return results


   #return[(1,4,7), (2,5,8), (3,6,9)]

if __name__ == "__main__":

    my_zip([1,2,3], [4,5,6], [7,8,9], [10,11,12], ["a","b","c"])

    print(list(zip[1,2,3], [4,5,6], [7,8,9], [10,11,12], ["a","b","c"] ))
    print(my_zip([1,2,3], [4,5,6], [7,8,9], [10,11,12], ["a","b","C"]))