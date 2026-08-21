from secrets import compare_digest


def verify_secret(value: str, expected: str) -> bool:
    return compare_digest(value, expected)
