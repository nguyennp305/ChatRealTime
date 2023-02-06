import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import styled from 'styled-components'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogOutIcon from '@mui/icons-material/LogOut'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'


const StyledContainer = styled.div`
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow: scroll;
border-right: 1px solid whitesmoke;
`
const StyledHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid whitesmoke;
position: sticky;
top: 0;
background-color: white;
z-index: 1;
`
const StyledSearch = styled.div`
display: flex;
align-items: center;
padding: 15px;
border-radius: 2px;
`

const StyledUserAvatar = styled(Avatar)`
cusor: pointer;
:hover {
    opacity: 0.8;
}
`

const StyledSearchInput = styled.input`
outline: none;
border: none;
flex: 1;
`

const StyledSidebarButton = styled(Button)`
width: 100%;
border-top: 1px solid whitesmoke;
border-bottom: 1px solid whitesmoke;
`

const SideBar = () => {
  return (
    <StyledContainer>

        <StyledHeader>
            <Tooltip title='user email' placement='right'>
            <StyledUserAvatar/>
            </Tooltip>

            <div>
            <IconButton>
                <ChatIcon/>
            </IconButton>

            <IconButton>
                <MoreVerticalIcon/>
            </IconButton>
            
            <IconButton>
                <LogOutIcon/>
            </IconButton>
            </div>
        </StyledHeader>

        <StyledSearch>
            <SearchIcon/>
            <StyledSearchInput placeholder='Search in conversations'/>

        </StyledSearch>

        <StyledSidebarButton>START A NEW CONVERSATION</StyledSidebarButton>
    </StyledContainer>
  )
}

export default SideBar