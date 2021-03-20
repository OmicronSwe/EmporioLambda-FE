import React from "react";
import NewCategoryForm from "./NewCategoryForm";
import { insertCategory, getCategories, removeCategory } from "../../pages/api/Services/dashboard";
import { Category } from "../../src/objects/Category";
import CategoryList from "./CategoryList";

class CategorySection extends React.Component<{ categories: Category[]; refreshOnCategoryChange }/*, { categories: Category[] }*/> {
  constructor(props) {
    super(props);
    //const { categories } = this.props;
    //this.state = { categories };
  }

  insertCategory = async (event) => {
    event.preventDefault();
    const { refreshOnCategoryChange } = this.props;
    const category:Category = new Category(event.target.name.value)
    await insertCategory(category);
    refreshOnCategoryChange();
    /*
    const categories = await getCategories();
    this.setState({ categories });
    */
  };

  removeCategory = async (name: string) => {
    const { refreshOnCategoryChange } = this.props;
    await removeCategory(name);
    refreshOnCategoryChange();
    /*
    const categories : Category[] = await getCategories();
    this.setState({ categories });
    */
  };

  render() {
    //const { categories } = this.state;
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
