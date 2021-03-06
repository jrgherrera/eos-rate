import mockedBPs from 'mock/bps'
import client from 'services/graphql'
import gql from 'graphql-tag'

const getRandomParameter = (max = 10) => Math.floor(Math.random() * max)

export const getAllBPs = async ({ nameFilter = '' } = {}) => {
  const {
    data: { producers_list: producers }
  } = await client.query({
    query: gql`
      query blockProducers($nameFilter: String!) {
        producers_list(
          where: { _or: { candidate_name: { _ilike: $nameFilter } } }
          order_by: { total_votes: desc }
        ) {
          owner
          system
          bpjson
        }
      }
    `,
    variables: {
      nameFilter: `%${nameFilter}%`
    }
  })
  return producers.map(producer => ({
    ...producer,
    system: {
      ...producer.system,
      parameters: {
        infrastructure: getRandomParameter(),
        tooling: getRandomParameter(),
        community: getRandomParameter(),
        transparency: getRandomParameter(),
        testnets: getRandomParameter()
      }
    }
  }))
}

export const findBPs = async (filter = {}) => mockedBPs

export const findBPById = async id => mockedBPs[id]

window.getAllBPs = getAllBPs
