import React, { FC, Fragment, useCallback } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Props from './interface'
import useStyles from './style'

const SearchBar: FC<Props> = ({ setSearch, onSubmit, search }) => {
  const classes = useStyles()

  const formatLetters = (str:string) => {
    let aa = new RegExp("^$|^[A-Za-z]*$")
    if (aa.test(str)) {
      return str
    } else {
      return ""
    }
  };

  const handleSearch = useCallback(
    (event) => {
      const { value } = event.target
      const newValue = formatLetters(value)
      console.log(newValue)
      if (newValue || search) setSearch(newValue)
      else {
        if (value.length === 0) {
          setSearch('')
        }
      }
    },
    [setSearch],
  )
  return (
    <Fragment>
      <div className={classes.searchInputHolder}>
        <SearchIcon />
        <input
          type='text'
          placeholder='Search'
          className='inputField'
          value={search}
          onChange={handleSearch}
          onKeyPress={(e) => onSubmit(e)}
        />
      </div>
    </Fragment>
  )
}

export default SearchBar
