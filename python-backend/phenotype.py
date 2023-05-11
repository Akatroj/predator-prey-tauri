class Phenotype:
    def __init__(self):
        self.diet = "null"
        self.traits = []

    def update_phenotype_from_genotype(self, genotype):
        for trait in self.traits:



class Trait:
    """
    Traits will affect certain statistics present in
    entity phenotype.

    Magnitude: -100 to 100

    Affected stat: from Phenotype.traits

    """
    def __init__(self):
        self.trait_name = ""
        self.magnitude = 0  # No initial change
        self.genes = []