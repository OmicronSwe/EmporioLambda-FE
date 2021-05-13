import React from "react";
import NewCategoryForm from "./NewCategoryForm";
import { insertCategory, removeCategory } from "../../src/Services/dashboard";
import CategoryList from "./CategoryList";

class CategorySection extends React.Component<
  {
    categories: string[];
    refreshOnCategoryChange;
    session;
  },
  {
    categoryInsertedAlert: boolean;
    categoryRemovedAlert: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = { categoryInsertedAlert: null, categoryRemovedAlert: null };
  }

  insertCategory = async (event) => {
    event.preventDefault();
    const { refreshOnCategoryChange, session } = this.props;
    const category: string = event.target.name.value;
    const result: boolean = await insertCategory(category, session);
    this.setState({ categoryInsertedAlert: result });
    refreshOnCategoryChange();
  };

  removeCategory = async (name: string) => {
    const { refreshOnCategoryChange, session } = this.props;
    const result: boolean = await removeCategory(name, session);
    this.setState({ categoryRemovedAlert: result });
    refreshOnCategoryChange();
  };

  handleInsertAlert = async () => {
    this.setState({ categoryInsertedAlert: null });
  };

  handleRemoveAlert = async () => {
    this.setState({ categoryRemovedAlert: null });
  };

  render() {
    const { categories } = this.props;
    const { categoryInsertedAlert, categoryRemovedAlert } = this.state;
    return (
      <>
        <h1>Category Section</h1>
        <NewCategoryForm
          insertCategory={this.insertCategory}
          categoryInsertedAlert={categoryInsertedAlert}
          handleInsertAlert={this.handleInsertAlert}
        />
        <CategoryList
          categories={categories}
          removeCategory={this.removeCategory}
          categoryRemovedAlert={categoryRemovedAlert}
          handleRemoveAlert={this.handleRemoveAlert}
        />
      </>
    );
  }
}

export default CategorySection;
