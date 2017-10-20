// const apis = {
//   items: [
//     {
//       method: 'get',
//       title: 'AI api 1',
//     },
//     {
//       method: 'post',
//       title: 'AI api 2',
//     },
//     {
//       method: 'delete',
//       title: 'AI api 3',
//     }
//   ]
// }
//
// const fields = [
//   {
//     name: 'channel',
//     type: 'STRING',
//     describe: 'Channel Name',
//     required: true,
//     place_holder: 'my_channel',
//   },
//   {
//     name: 'subscribe_key',
//     type: 'STRING',
//     describe: 'Subscribe Key',
//     required: false,
//     place_holder: 'demo',
//   },
// ]
//
// const forms = [
//   {
//     title: 'request headers',
//     fields,
//   },
//   {
//     title: 'url pareameters',
//     fields,
//   },
//   {
//     title: 'form encoded pareameters',
//     fields,
//   },
// ]
//
// const request = {
//   title: 'Call AI',
//   describe: 'Make a request to the specific AI api',
//   forms,
// }
//
// const response = {
//   method: 'put',
//   url: 'www.google.com',
//   requestExample: `// These code snippets use an open-source library. http://unirest.io/php
//   $response = Unirest.Request::get("https://23andme-23andme.p.mashape.com/names/a42e94634e3f7683/",
//     array(
//         "X-Mashape-Key" => "<required>",
//         "Authorization" => "<required>",
//         "Accept" => "text/plain"
//       )
//   );`,
//     statusCode: 200,
//     contentType: 'TEXT',
//     endPointTitle: 'publish get by link',
//     responseBody: 'No sample was provided with this model.'
// }
//
// const profile = {
//   creator: '23andme',
//   logoSrc: 'https://s3.amazonaws.com/mashape-production-logos/apis/53aa3b84e4b059614033fa49_medium',
//   title: '23andMe',
//   host: 'https://api.23andme.com',
//   tag: 'Medical',
//   createAt: 'Created: April 2013',
//   describe: `23andMe's OAuth 2.0 API lets developers build apps and tools on the human genome. Our customers are genotyped for over 1,000,000 SNPs, conveniently accessible through our free REST API. Not genotyped? We have demo endpoints. No need for a ... Read more`,
// }
//
// export default {
//   apis,
//   request,
//   response,
//   profile,
// }
import baidu from './baidu'
import ali from './ali'
import xiaoi from './xiaoi'
import xunfei from './xunfei'

export default {
  baidu,
  ali,
  xiaoi,
  xunfei,
}
