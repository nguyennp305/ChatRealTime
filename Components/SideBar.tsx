import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import React, { useState } from 'react'
import styled from 'styled-components'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogOutIcon from '@mui/icons-material/LogOut'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import { signOut } from 'firebase/auth'
import { auth, db } from '@/config/firebase'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import { TextField, DialogActions } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as EmailValidator from 'email-validator'
import { async } from '@firebase/util'
import { addDoc, collection } from 'firebase/firestore'



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
    const [loggerInUser, _loading, error] = useAuthState(auth);
    const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false)
    // trường ghi để thay đổi nội dung input email trong isOpenNewConversation. 
    const [recipientEmail, setRecipientEmail] = useState('')
    // hàm để mở ConversationDialog
    const toggleNewConversationDialog = (isOpen: boolean) => {
        setIsOpenNewConversationDialog(isOpen)

        if (!isOpen) {
            setRecipientEmail('')
        }
    }

    const closeNewConversationDialog = () => {
        toggleNewConversationDialog(false)
    }

    // Check xem đã gửi yêu cầu cho email chưa, nếu đã gửi thì không đc gửi lại nữa.
    const isConverStationAlreadyExist = async (recipientEmail: string) => {
        
    }

    // nếu mời chính mình thì không cho phép.
    const isInvitingSelf = recipientEmail === loggerInUser?.email

    const createConversation = async() => {
        if (!recipientEmail) return
        // nếu là email thì trả về true
        if (EmailValidator.validate(recipientEmail) && !isInvitingSelf)
        // Add conversation to database 'conversations collection'
         // A conversation is betwwen the current logged in user and user invited.

         await addDoc(collection(db, 'conversations'), {
            users: [loggerInUser?.email, recipientEmail]
            
         }
)

        closeNewConversationDialog()
        
    }

    const logOut = async() => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log('Error logging out', error)
    }
}

  return (
    <StyledContainer>

        <StyledHeader>
            <Tooltip title={loggerInUser?.email as string} placement='right'>
            <StyledUserAvatar src={loggerInUser?.photoURL || ''}/>
            </Tooltip>

            <div>
            <IconButton>
                <ChatIcon/>
            </IconButton>

            <IconButton>
                <MoreVerticalIcon/>
            </IconButton>
            
            <IconButton onClick={logOut}>
                <LogOutIcon/>
            </IconButton>
            </div>
        </StyledHeader>

        <StyledSearch>
            <SearchIcon/>
            <StyledSearchInput placeholder='Search in conversations'/>

        </StyledSearch>

        <StyledSidebarButton onClick={() => {
            toggleNewConversationDialog(true)
        }}>START A NEW CONVERSATION</StyledSidebarButton>

        {/* List of conversations */}

        <Dialog open={isOpenNewConversationDialog} onClose={closeNewConversationDialog}>
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user you wish to chat
          </DialogContentText>
          <TextField
            autoFocus
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewConversationDialog}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
        </DialogActions>
      </Dialog>

    </StyledContainer>
  )
}

export default SideBar