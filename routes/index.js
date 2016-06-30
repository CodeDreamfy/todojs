module.exports = (app)=>{
  app.get('/', (req, res, next)=>{
    res.render('index', { title: 'Express'})
  })
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    res.render('error', { title: 'err'})
  });
};
