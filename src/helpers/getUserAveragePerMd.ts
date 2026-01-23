// Will calculate the users average per md 

export interface functionProps {
    userCompleted: number
    userMd: number
}

export function getCompletionDiffernce({
    userCompleted,
    userMd
}: functionProps) {
    const result = userCompleted / userMd
  return result ;
}