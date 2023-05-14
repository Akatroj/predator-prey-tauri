import unittest


class TestCoevolutionBackend(unittest.TestCase):

    def test_allele_generation(self):
        from genetics import Allele as Al
        for i in range(10):
            allele_test = Al(gene_name="test_gene")
            print("Allele UUID:{}\nAllele value:{}".format(allele_test.identifier, allele_test.value))

    def test_animal_generation(self):  # ...and genotype generation too
        from map_entities import Omnivore
        from genetics import GenotypeConstructor
        new_genotype = GenotypeConstructor().initialize_new_genotype()
        omnivore_test = Omnivore(animal_genotype=new_genotype)
        pass

    def test_animal_interactions(self):  # ...and genotype generation too
        from map_entities import Omnivore
        from genetics import GenotypeConstructor
        new_genotype1 = GenotypeConstructor().initialize_new_genotype()
        new_genotype2 = GenotypeConstructor().initialize_new_genotype()
        omnivore_test1 = Omnivore(animal_genotype=new_genotype1)
        omnivore_test2 = Omnivore(animal_genotype=new_genotype2)
        pass

if __name__ == '__main__':
    unittest.main()
