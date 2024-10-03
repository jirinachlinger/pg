# funkce demonstrující cyklus while 
def stars_while():
    print("zacatek")

    i = 0

    while i<5:
     print("*")
    i += 1 

    print("konec")


# funkce demonstrujcí cyklus for
def stars_for():
    print("zacatek")

    for i in [0,1,2,3,4]:
        print("*", i)

    print("konec")


# funkce urcujicí, zda number lezi mezi min a max 
def in_range(min_number, max_number, number):
   if number >= min_number and number <= max_number:
        print("is in range")
   else:
        print("is not in range")

#in_range(100,1000,500)


# funkce vypise "ahoj jmeno"
def zobraz_pozdrav(jmeno):
    print("ahoj", jm)

jm = input("zdadej jmeno: ")
zobraz_pozdrav(jm)
