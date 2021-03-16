class DashboardViewModel {
  model = null;

  constructor(Model) {
    this.model = Model;
  }

  insertProduct = async (params) => {
    return this.model.insertProduct(params);
  };
}

export default DashboardViewModel;
