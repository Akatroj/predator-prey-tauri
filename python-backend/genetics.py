from typing import Type, Callable, List
import math
import uuid
import string
import warnings
import sys
from random import choice as random_element
from config_classes import InitPopConfig
import random

"""This file contains definitions of classes created to
simulate the evolution process, based on Mendelian model of evolution.

The base of the genetics system is an Allele.
It's a basic indivisible unit of genetic information.
It contains three information:
    -value(between -3 and 3)
    -gene_name -> to which gene the Allele belongs -> which individual trait it affects
    -identifier -> used to track the allele in the population

Our organisms will be diploids, with different diets. The individuals will be hermaphrodites,
whichever individual initiates the mating becomes a male, and the other one becomes a female.
(like in slugs)
"""


def sigmoid(x): return 1.0 / (1.0 + math.exp(-x))


class Allele:
    """
    Allele is a variant of a gene
    """

    def __init__(self, gene_name: str, value: float = None):
        if value is None:
            self.value = random.uniform(-3, 3)
        else:
            self.value = value
        self.gene_name = gene_name
        self.identifier = uuid.uuid1().hex  # Unique object identifier


class Gene:
    """
    For the purpose of the system the evolution will be based on Mendelian Genetics.
    Namely, a gene is going to be represented as a collection of alleles.
    With such model we can simulate different Heritability gene models.
    Going a level deeper, into realms of molecular genetics would make the code overly complicated for it's purpose.
    """

    def __init__(self, affects: str, allele: list[Allele] = None, mutation_ratio: float = 1.1):
        if allele is None:
            self.allele = [Allele(gene_name=affects), Allele(gene_name=affects)]
        else:
            self.allele = allele  # Affects how the gene is expressed, for now, each gene will have two alleles
        self.affects = affects
        self.mutation_ratio = mutation_ratio

    def get_random_allele(self, mutate: bool = True):
        """
        Every entity will be a Diploid for sake of simplicity
        """

        if mutate:
            return random_element(self.allele)
        else:
            try:
                return self.mutation_function(random_element(self.allele))
            except TypeError:
                sys.exit('Type Error! Provided mutation function is not callable')

    def get_allele(self):
        return self.allele

    def express_gene(self) -> float:  # TODO universal method allowing for different expression functions.'''
        return sigmoid(sum([allele.value for allele in self.allele]))


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

    def __init__(self, genes: list[Gene]=None):
        self.genes = genes

    def get_gametes(self, n_gametes: int = 1, mutation_function=None) -> list[Type[Allele]]:
        gametes: list(Type[Allele]) = []
        for _ in range(n_gametes):
            gamete = [gene.get_random_allele(mutation_function) for gene in self.genes]
            gametes.append(gamete)
        return gametes


class Phenotype:
    """Collection of traits of a single organism"""

    def __init__(self, genotype: Genotype):
        self.traits: dict[str, float] = {}
        for gene in genotype.genes:
            self.traits[gene.affects] = gene.express_gene()


class GenotypeConstructor:
    def __init__(self):
        self.config = InitPopConfig

    @staticmethod
    def initialize_new_animal_genotype() -> Genotype:
        gene_list: list(Gene) = []
        for trait in InitPopConfig().available_traits:
            gene_list.append(Gene(affects=trait))
        return Genotype(gene_list)

    @staticmethod
    def construct_genotype_from_alleles(allele_list: List[Allele]) -> Genotype:
        gene_names = set([allele.gene_name for allele in allele_list])
        gene_list = []
        for gene_name in gene_names:
            gene_list.append(Gene(affects=gene_name,
                                  allele=[allele for allele in allele_list if allele.gene_name == gene_name]))
        return Genotype(genes=gene_list)
