import React from "react";
import NewCategoryForm from "./NewCategoryForm";
import { insertCategory, getCategories, removeCategory } from "../../pages/api/Services/dashboard";
import Category from "../../src/objects/Category";
import CategoryList from "./CategoryList";

class CategorySection extends React.Component<{ categories }, { categories }> {
  constructor(props) {
    super(props);
    const { categories } = this.props;
    this.state = { categories };
  }

  insertCategory = async (event: Event) => {
    event.preventDefault();
    const category = new Category(event).toJSONstring();
    await insertCategory(category);

    const categories = await getCategories();
    this.setState({ categories });
  };

  removeCategory = async (name: string) => {
    await removeCategory(name);

    const categories = await getCategories();
    this.setState({ categories });
  };

  render() {
    const { categories } = this.state;
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
