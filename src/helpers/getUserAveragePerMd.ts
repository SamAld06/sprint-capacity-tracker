// Will calculate the users average per md for one sprint

export function getUserAveragePerMd(
    userCompleted : number,
    userMd : number
) {
    if (userMd === 0 ) {
      const result = 0
      return result;
    }
    const result = userCompleted / userMd
  return result ;
}