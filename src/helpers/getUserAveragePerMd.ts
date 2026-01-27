// Will calculate the users average per md for one sprint

export function getUserAveragePerMd(
    userCompleted : number,
    userMd : number
) {
    const result = userCompleted / userMd
  return result ;
}