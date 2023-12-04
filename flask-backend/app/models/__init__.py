from flask import Blueprint

model = Blueprint('models',__name__)

from .customer import Customer
from .dose import Dose
from .image import Image
from .manufacture import Manufacture
from .manufacture_code import ManufactureCode
from .medicine_category import MedicineCategory
from .medicine_inventory import MedicineInventory
from .medicine import Medicine
from .order_payment import OrderPayment
from .order import Order
from .order_item import OrderItem
from .payment_method import PaymentMethod