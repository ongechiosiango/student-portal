#!/usr/bin/env python3
"""Student portal: view grades, compute GPA."""
from dataclasses import dataclass
from typing import List

GRADE_POINTS = {"A": 4.0, "B": 3.0, "C": 2.0, "D": 1.0, "F": 0.0}


@dataclass
class Course:
    name: str
    grade: str
    credits: int


def gpa(courses: List[Course]) -> float:
    total_credits = sum(c.credits for c in courses)
    if total_credits == 0:
        return 0.0
    points = sum(GRADE_POINTS[c.grade] * c.credits for c in courses)
    return points / total_credits


if __name__ == "__main__":
    courses = [
        Course("Intro to CS", "A", 3),
        Course("Calculus I", "B", 4),
        Course("Physics", "A", 4),
    ]
    print(f"GPA: {gpa(courses):.2f}")
