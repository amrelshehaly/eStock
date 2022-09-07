import React, { FC } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Props from './interface'
import useStyles from './style'

const SearchBar: FC<Props> = ({ setSearch, onSubmit, search }) => {

  const classes = useStyles()
  return (
    <div className={classes.searchInputHolder}>
      <SearchIcon />
      <input
        type='text'
        placeholder='Search'
        className='inputField'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => onSubmit(e)}
      />
    </div>
  )
}

export default SearchBar
