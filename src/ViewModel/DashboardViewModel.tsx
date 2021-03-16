class DashboardViewModel {
  model = null;

  constructor(Model) {
    this.model = Model;
  }

  doModelAction(){
    return this.model.doModelAction();
  }
}

export default DashboardViewModel;
