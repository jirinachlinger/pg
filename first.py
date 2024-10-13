#def hello():
#    print("Hello World")



def sudy_nebo_lichy(cislo):
    vysledek = cislo % 2


    if vysledek == 0:
        print("číslo",cislo,"je sudé")
    else:
        print("číslo",cislo,"je liché")

    

sudy_nebo_lichy(5)
sudy_nebo_lichy(1000000)

