import React, { Component } from 'react'
import './Recipes.css'
import Recipe from './Recipe'
import { AZ, ZA } from "./Sort"
import Layout from './shared/Layout'
import { getRecipes } from '../services/recipe'
import Search from './Search'


class Recipes extends Component {
  constructor() {
    super()
    this.state = {
      recipes: [],
      filterValue: '',
      filteredRecipes: null,
      selectValue: 'Featured'
    }
  }

  async componentDidMount() {
    const recipes = await getRecipes()
    this.setState({ recipes })
  }

  handleSearchChange = event => {
    
    const filter = () => {
      const filteredRecipes = this.state.recipes.filter(recipe => {
        return recipe.cuisine.toLowerCase().includes(this.state.filterValue.toLowerCase()) ||
        recipe.name.toLowerCase().includes(this.state.filterValue.toLowerCase())
      })
      this.setState({ filteredRecipes })
    }
    this.setState({ filterValue: event.target.value }, filter)
  }

  handleSortChange = event => {
    this.setState({ selectValue: event.target.value });
    let input = event.target.value; // a-z
    const { recipes } = this.state;
    switch (input) {
      case "name-ascending":
        this.setState({
          recipes: AZ(recipes)
        });
        break;
      case "name-descending":
        this.setState({
          recipes: ZA(recipes)
        });
        break;
      default:
        break
    }
  }

  handleSubmit = event => event.preventDefault()

  render() {
    const recipes = this.state.filteredRecipes ? this.state.filteredRecipes : this.state.recipes
    const RECIPES = recipes.map((recipe, index) =>
      <Recipe _id={recipe._id} name={recipe.name} img={recipe.img} difficulty={recipe.difficulty} cooktime={recipe.cooktime} key={index} />
    )

    return (
      <Layout user={this.props.user}>
        <Search onSubmit={this.handleSubmit} value={this.state.filterValue} onChange={this.handleSearchChange} />
        <form className="sort-container" onSubmit={this.handleSubmit}>
          <label htmlFor="sort">SORT BY:</label>
          <select className="sort" value={this.state.selectValue} onChange={this.handleSortChange}>
            <option className="option" value="name-ascending" >&nbsp; Alphabetically, A-Z &nbsp;</option>
            <option value="name-descending">&nbsp; Alphabetically, Z-A &nbsp;</option>

          </select>
        </form>
        <div className="recipes">
          {RECIPES}
        </div>
      </Layout>
    )
  }
}

export default Recipes