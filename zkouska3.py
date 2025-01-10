import math

# Základní třída pro všechny tvary
class Shape():
    #metoda area
    def area(self):
        return 0.0

#atribut width a height
class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
#přidává vlastní implementaci metody area pro výpočet obsahu obdélníka
    def area(self):
        return self.width * self.height


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * (self.radius ** 2)


def test_shapes():
    rect = Rectangle(4, 5)
    assert rect.area() == 20

    circle = Circle(3)
    assert round(circle.area(), 1) == 28.3