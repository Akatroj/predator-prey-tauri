

class MapInformer:
    def __init__(self, sim_class_ref):
        self.sim_class_ref = sim_class_ref

    def get_grass_ref(self):
        return self.sim_class_ref.grass_matrix

    def check_grass_grid(self, x, y):
        return self.sim_class_ref.grass_matrix[x, y] == 1