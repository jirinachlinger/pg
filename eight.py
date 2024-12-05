

def bin_to_dec(binarni_cislo):
    if isinstance(binarni_cislo, int):
        binarni_cislo = str(binarni_cislo)
    return int(binarni_cislo, 2)


def test_funkce():
    assert bin_to_dec("0") == 0
    assert bin_to_dec(1) == 1
    assert bin_to_dec("100") == 4
    assert bin_to_dec(101) == 5
    assert bin_to_dec("010101") == 21
    assert bin_to_dec(10000000) == 128

test_funkce()
print("Všechny testy proběhly úspěšně!")