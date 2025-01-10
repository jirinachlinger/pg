import requests
#Získávání dat z webu
def convert_to_czk(amount, currency):
    # Stáhování kurzovního lísteku z CNB
    url = "http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt"
    response = requests.get(url)
    
    if response.status_code != 200:
        raise ConnectionError("Failed to fetch exchange rates.")
#převod odstavce na jednu dlouhou řádku rozděl čárkami
    rates = response.text.splitlines()
    
    # Hledam kurz pro zadanou měnu
    for radky in rates:
        if currency in radky:
            parts = radky.split('|')
            if len(parts) >= 5:
                try:
                    sm_kurz = float(parts[4].replace(",", "."))
                    return round(amount * sm_kurz, 2) #zaokrouhlování na dvě desetinná místa pomocí round()
                except ValueError:
                    raise ValueError(f"Invalid exchange rate for {currency}.")
    
    # Pokud měna není nalezena = výjimka
    raise ValueError(f"Currency {currency} not found in the exchange rate list.")
  

from unittest.mock import patch, MagicMock

def test_convert_to_czk():
    mock_response = """31.10.2025 #237
země|měna|množství|kód|kurz
Austrálie|dolar|1|AUD|14,894
EMU|euro|1|EUR|25,480
USA|dolar|1|USD|23,000
Velká Británie|libra|1|GBP|29,745
"""
    with patch("requests.get") as mock_get:
        mock_get.return_value = MagicMock(ok=True, status_code=200, text=mock_response)

        assert convert_to_czk(100, "USD") == 2300.00
        assert convert_to_czk(50, "EUR") == 1274.00
        assert convert_to_czk(200, "AUD") == 2978.80
        
        try:
            convert_to_czk(100, "XYZ")
        except ValueError as e:
            assert str(e) == "Currency XYZ not found in the exchange rate list."

convert_to_czk(100, "USD")