import React from "react";
import NewCategoryForm from "./NewCategoryForm";
import { insertCategory, removeCategory } from "../../pages/api/Services/dashboard";
import CategoryList from "./CategoryList";

class CategorySection extends React.Component<{
  categories: string[];
  refreshOnCategoryChange;
  session;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  insertCategory = async (event) => {
    event.preventDefault();
    const { refreshOnCategoryChange, session } = this.props;
    const category: string = event.target.name.value;
    await insertCategory(category, session);
    refreshOnCategoryChange();
  };

  removeCategory = async (name: string) => {
    const { refreshOnCategoryChange, session } = this.props;
    await removeCategory(name, session);
    refreshOnCategoryChange();
  };

  render() {
    const { categories } = this.props;
    return (
      <>
        <h1>Category Section</h1>
        <NewCategoryForm insertCategory={this.insertCategory} />
        <CategoryList categories={categories} removeCategory={this.removeCategory} />
      </>
    );
  }
}

export default CategorySection;
