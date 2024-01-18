import { User } from 'src/types/user.type'

interface UserContextInterface extends User {
  followed: []
  following: []
  all_tweet: []
}
