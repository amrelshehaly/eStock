import React, { FC, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Props from './interface'
import useStyles from './style'

const SearchBar: FC<Props> = ({ setSearch }) => {
  const [value, setValue] = useState('')

  const submit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setSearch(value)
    }
  }
  const classes = useStyles()
  return (
    <div className={classes.searchInputHolder}>
      <SearchIcon />
      <input
        type='text'
        placeholder='Search'
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => submit(e)}
      />
    </div>
  )
}

export default SearchBar
