def process_strings(strings):
    vysledek = []
    for string in strings:
        if string == "STOP":
            break
        if len(string) > 3:
            vysledek.append(string.upper())
    return vysledek


def test_process_strings():
    assert process_strings(["abc", "abcd", "STOP", "efgh"]) == ["ABCD"]
    assert process_strings(["hello", "world", "STOP", "python"]) == ["HELLO", "WORLD"]
    assert process_strings(["hi", "ok", "go"]) == []
    assert process_strings(["code", "test", "debug"]) == ["CODE", "TEST", "DEBUG"]