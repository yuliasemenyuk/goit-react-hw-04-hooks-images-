import {useState} from "react";
import propTypes from "prop-types";
import style from "./Searchbar.module.css";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";

export default function Searchbar() {
    const [imageName, setImageName] = useState('');

    const handleNameChange = e => {
        setImageName(e.target.value);
    };

    const handleSubmit = (e) => {
            e.preventDefault();
        
            if (imageName.trim() === "") {
              toast.error("Search field can`t be empty!");
              return;
            }
        
            onSubmit(imageName);
            setImageName('');
          };
        

    return (
        <header className={style.Searchbar}>
        <form onSubmit={handleSubmit} className={style.SearchForm}>
          <button type="submit" className={style.SearchForm_button}>
            <ImSearch />
          </button>

          <input
            className={style.SearchForm_input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imageName}
            onChange={handleNameChange}
          />
        </form>
      </header>
    )
}



//   state = {
//     imageName: "",
//   };

//   handleNameChange = (evt) => {
//     this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = (evt) => {
//     evt.preventDefault();

//     if (this.state.imageName.trim() === "") {
//       toast.error("Search field can`t be empty!");
//       return;
//     }

//     this.props.onSubmit(this.state.imageName);
//     this.setState({ imageName: "" });
//   };

//   render() {
//     return (
//       <header className={style.Searchbar}>
//         <form onSubmit={this.handleSubmit} className={style.SearchForm}>
//           <button type="submit" className={style.SearchForm_button}>
//             <ImSearch />
//           </button>

//           <input
//             className={style.SearchForm_input}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.imageName}
//             onChange={this.handleNameChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};