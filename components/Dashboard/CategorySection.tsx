import React from "react";
import NewCategoryForm from "./NewCategoryForm";
import { insertCategory, removeCategory } from "../../pages/api/Services/dashboard";
import { Category } from "../../src/objects/Category";
import CategoryList from "./CategoryList";

class CategorySection extends React.Component<{
  categories: Category[];
  refreshOnCategoryChange;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  insertCategory = async (event) => {
    event.preventDefault();
    const { refreshOnCategoryChange } = this.props;
    const category: Category = new Category(event.target.name.value);
    await insertCategory(category);
    refreshOnCategoryChange();
  };

  removeCategory = async (name: string) => {
    const { refreshOnCategoryChange } = this.props;
    await removeCategory(name);
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
