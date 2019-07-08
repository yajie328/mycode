function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}
const List = [];
const count = 60;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
  }));
}
const getUserList = (config) => {
  console.log(config);
  const { name, page = 1, limit = 20 } = param2Obj(config.url);

  const mockList = List.filter((user) => {
    if (name && user.name.indexOf(name) === -1) return false;
    return true;
  });

  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));

  return {
    code: 0,
    data: {
      total: mockList.length,
      users: pageList,
    },
  };
};
