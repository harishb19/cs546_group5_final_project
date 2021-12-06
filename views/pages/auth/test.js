<div className="form-outline mb-3">
    <input type="text" id="firstName" className="form-control form-control-lg"
           placeholder="Enter first name" value="{{accessElement (split session.user.displayName " ") 0}}"/>
    <label className="form-label" htmlFor="firstName">First Name</label>
</div>

<div className="form-outline mb-3">
    <input type="text" id="lastName" className="form-control form-control-lg"
           placeholder="Enter last name"
           value="{{accessElement (split session.user.displayName " ") 1}}"
    />
    <label className="form-label" htmlFor="lastName">Last Name</label>
</div>
