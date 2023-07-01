import unittest


class TestCoevolutionBackend(unittest.TestCase):

    def test_allele_generation(self):
        from genetics import Allele as Al
        for i in range(10):
            allele_test = Al(gene_name="test_gene")
            print("Allele UUID:{}\nAllele value:{}".format(allele_test.identifier, allele_test.value))

    def test_animal_generation(self):  # ...and genotype generation too
        from map_entities import Animal
        from genetics import GenotypeConstructor
        new_genotype1 = GenotypeConstructor().initialize_new_animal_genotype()
        new_genotype2 = GenotypeConstructor().initialize_new_animal_genotype()
        animal_test1 = Animal(animal_genotype=new_genotype1)
        animal_test2 = Animal(animal_genotype=new_genotype2)
        animal_test1.update_entity()
        animal_test2.update_entity()
        pass

    def test_animal_interactions(self):
        from genetics import GenotypeConstructor
        from map_entities import Animal
        from map_entities_interactions import mate_two_animals
        new_genotype1 = GenotypeConstructor().initialize_new_animal_genotype()
        new_genotype2 = GenotypeConstructor().initialize_new_animal_genotype()
        animal_test1 = Animal(animal_genotype=new_genotype1)
        animal_test2 = Animal(animal_genotype=new_genotype2)
        children = mate_two_animals(animal_test1, animal_test2)

        pass

    def test_simulation_class(self):
        from simulation_class_v2 import SimulationClassV2
        sim_instance = SimulationClassV2(seed=1234)
        from pygame_frontend import FrontEnd
        pass

if __name__ == '__main__':
    unittest.main()
