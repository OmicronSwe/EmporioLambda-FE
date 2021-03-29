import React from "react";

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

  render() {
    const { categories } = this.props;
    return (
      <>
        <h1>Category Section</h1>
        <CategoryList categories={categories} />
      </>
    );
  }
}

export default CategorySection;
