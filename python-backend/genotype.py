from typing import Type
import math
import uuid
import string
from random import choice as random_element

def sigmoid(x): return 1 / (1 + math.exp(-x))


class Allele:
    """
    Allele is a variant of a gene
    """
    def __init__(self, value: int):
        self.value = value
        self.identifier = uuid.uuid4().hex  # Unique object identifier


class Gene:
    """
    For the purpose of the system the evolution of the system will be using model based on
    Mendelian Genetics. Namely, a gene is going to be represented as a collection of alleles. Going a level deeper, into
    realms of molecular genetics would make the code overly complicated for it's purpose.
    """
    def __init__(self, allele: list[Type[Allele]], affects: str, mutation_ratio: float):
        self.allele = allele  # Affects how the gene is expressed, for now, each gene will have two alleles
        self.affects = affects
        self.mutation_ratio = mutation_ratio

    def get_allele(self):
        """
        Every entity will be a Diploid for sake of simplicity
        """
        return random_element(self.allele)


class Trait:
    def __init__(self, name: str, value: float, bias: float):
        self.name = name
        self.inherited_value = value
        self.bias = bias
        if abs(self.inherited_value) > 3:
            self.inherited_value = math.copysign(3, self.inherited_value)
        self.value = lambda: sigmoid(self.inherited_value) * bias


class Genotype:
    """Collection of genes of a single organism"""

    def __init__(self, genes: list[Type[Gene]]):
        self.genes = genes


class Phenotype:
    """Collection of traits of a single organism"""

    def __init__(self, genotype: list[Type[Gene]]):
        self.traits: list[Trait]

class GenotypeConstructor:
    def __init__(self, config:):
        self.config =
    def initialize_new_individual(self, ):

