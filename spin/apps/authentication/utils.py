import random
import string
import time


def generator_hash(size=48, chars=string.ascii_letters + string.digits):
    """
    Return hash string. Min size = 24, max size = 256
    :param size: length of string
    :param chars: arr of chars
    :return: hash string
    """
    if size < 24:
        size = 24
    elif size > 256:
        size = 256

    time_now = str(time.time())
    hash_string = ''.join(random.choice(chars) for _ in range(size))
    result = list(hash_string)
    result[5] = time_now[0]
    result[7] = time_now[1]
    result[9] = time_now[2]
    result[11] = time_now[3]
    result[13] = time_now[4]
    result[15] = time_now[5]
    result[17] = time_now[6]
    result[19] = time_now[7]
    result[21] = time_now[8]
    result[23] = time_now[9]
    return "".join(result)
