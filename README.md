### Routing Testing Module - Test

This is a project to try to understand why the router provided by
RoutingTestingModule does not trigger an updated on the ActivatedRoute.url 
parameter.  

It has one component that subscribes to the ActivatedRoute.url - 
When that value changes, it updates the `path` variable in the component
to the value of the url segments. It also displays the value in the html
template for visual confirmation.

There are two test suites inside the PathListeningComponent module:
One runs a set of tests using RouterTestingModule and the other runs
the same sorts of specs using the ActivatedRouteStub method described
here: https://angular.io/guide/testing#activatedroutestub

I would expect the RoutingTestingModule to trigger a change in the
ActivatedRoute.url when calling navigate, but it does not.

For confirmation that the path is indeed changing in the RouterTestingModule
after calling navigate and tick I also do an expect on the Location.path()
and this passes.  But, again, the ActivatedRoute does not update on the
component.  I would expect the behavior to be the same between the test
and the manual testing.
