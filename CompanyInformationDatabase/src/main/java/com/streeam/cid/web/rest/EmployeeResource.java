package com.streeam.cid.web.rest;

import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.User;
import com.streeam.cid.repository.AuthorityRepository;
import com.streeam.cid.security.SecurityUtils;
import com.streeam.cid.service.CompanyService;
import com.streeam.cid.service.EmployeeService;
import com.streeam.cid.service.MailService;
import com.streeam.cid.service.UserService;
import com.streeam.cid.service.dto.EmployeeDTO;
import com.streeam.cid.service.mapper.EmployeeMapper;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import static com.streeam.cid.security.AuthoritiesConstants.ADMIN;
import static com.streeam.cid.security.AuthoritiesConstants.MANAGER;

/**
 * REST controller for managing {@link com.streeam.cid.domain.Employee}.
 */
@RestController
@RequestMapping("/api")
public class EmployeeResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeResource.class);

    private static final String ENTITY_NAME = "employee";

    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private MailService mailService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeService employeeService;

    public EmployeeResource(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }


    /**
     * {@code POST  /employees} : This endpoint is disabled. A employee is created only when a user registers and he's identity is confirmed.
     *
     * @param employeeDTO the employeeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employeeDTO, or with status {@code 400 (Bad Request)} if the employee has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employees")
    public void createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) throws URISyntaxException {
        throw new BadRequestAlertException("It is forbidden to create a employee from this endpoint", ENTITY_NAME, "endpointdisabled");
    }


    /**
     * {@code PUT  /employees} : Updates an existing employee and also update the linked user.
     *
     * @param employeeDTO the employeeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employeeDTO,
     * or with status {@code 400 (Bad Request)} if the employeeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employeeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employees")
    public ResponseEntity<EmployeeDTO> updateEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) throws URISyntaxException {
        log.debug("REST request to update Employee : {}", employeeDTO);
        Long employeeId = employeeDTO.getId();
        EmployeeDTO result;

        String currentUserLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() ->
            new BadRequestAlertException("No User currently logged in", ENTITY_NAME, "nouserloggedin"));

        if (employeeId == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "employeenotfound");
        }

        Employee employeeToModify = employeeService.findOneById(employeeId).orElseThrow(() -> new BadRequestAlertException("Employee not found.", ENTITY_NAME, "emailexists"));

        if (!employeeToModify.getUser().getEmail().equalsIgnoreCase(employeeDTO.getUser().getEmail())) {
            throw new BadRequestAlertException("You cannot update your email.", ENTITY_NAME, "emailcannotbemodified");
        }

        User linkedUser = Optional.of(employeeToModify.getUser()).orElseThrow(() ->
            new BadRequestAlertException("No user linked to this employee", ENTITY_NAME, "nouserlinkedtoemployee"));

        User currentUser = employeeService.findCurrentUser(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No User currently logged in", ENTITY_NAME, "nouserloggedin"));
        Employee currentEmployee = employeeService.findOneByUser(currentUser).orElseThrow(() ->
            new BadRequestAlertException("No Employee currently logged in", ENTITY_NAME, "noemployeeloggedin"));

        boolean currentUserIsNOTAdminOrManager = !employeeService.hasCurrentUserRoles(currentUser, MANAGER, ADMIN);
        // Scenario when a employee is trying to modify the details of another  employee and he is not a manager nor an admin.
        if (!linkedUser.getEmail().equalsIgnoreCase(currentUser.getEmail()) && currentUserIsNOTAdminOrManager) {
            throw new BadRequestAlertException("Modifying the details of another employee is forbidden.", ENTITY_NAME, "changejustyouraccount");
        }

        result = employeeService.save(employeeDTO);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employeeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employees} : get all the employees without pagination restriction limit (default 20);
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employees in body.
     */
    @GetMapping("/employees/all")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployeesWhitoutPagination() {
        log.debug("REST request to get a page of Employees");
        List<EmployeeDTO> list = employeeService.findAllEmployees();
        return ResponseEntity.ok().body(list);
    }

    /**
     * {@code GET  /employees} : get all the employees.
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employees in body.
     */
    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees(Pageable pageable) {
        log.debug("REST request to get a page of Employees");
        Page<EmployeeDTO> page = employeeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /employees/:id} : get the "id" employee.
     *
     * @param id the id of the employeeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeDTO> getEmployee(@PathVariable Long id) {
        log.debug("REST request to get Employee : {}", id);
        Optional<EmployeeDTO> employeeDTO = employeeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(employeeDTO);
    }


    /**
     * {@code GET  /employees/current-employee} : get the current employee.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employeeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employees/current-employee")
    public ResponseEntity<EmployeeDTO> getCurrentEmployee() {
        log.debug("REST request to get the current employee");
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();
        User currentUser = userService.getUserWithAuthoritiesByLogin(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));
        Employee employee = employeeService.findOneByUser(currentUser).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "userwithnoemployee"));;
        return ResponseEntity.ok().body(employeeMapper.toDto(employee));
    }

    /**
     * {@code DELETE  /employees/:id} : delete the "id" employee.
     *
     * @param employeeId the id of the employeeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employees/{employeeId}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long employeeId) {

        if (employeeId == null) {
            throw new BadRequestAlertException("Invalid employee id", ENTITY_NAME, "idemployeenull");
        }

        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User currentUser = employeeService.findCurrentUser(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No User currently logged in", ENTITY_NAME, "nouserloggedin"));

        Employee employeeToDelete = employeeService.findOneById(employeeId).orElseThrow(() ->
            new BadRequestAlertException("Employee not found.", ENTITY_NAME, "employeenotfound"));


        if (!employeeService.hasCurrentUserRoles(currentUser, ADMIN)) {
            throw new BadRequestAlertException("You don't have the authority to access this endpoint.", ENTITY_NAME, "accessrestricted");
        }
        //also deletes the linked user and updates the company if he is in one. Also delete all notification related to this employee

        User linkedUser = employeeService.findUserByEmail(employeeToDelete.getUser().getEmail()).orElseThrow(() -> new BadRequestAlertException("No user linked to this employee", ENTITY_NAME, "nouserlinkedtoemployee"));

        log.debug("REST request to delete Employee : {}", employeeId);
        employeeService.delete(employeeId);

        log.debug("REST request to delete all Employee's Notifications.");
        employeeService.deleteEmployeesNotifications(employeeToDelete);

        log.debug("REST request to delete User : {}", linkedUser.getId());
        employeeService.deleteLinkedUser(linkedUser);

        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, employeeId.toString())).build();
    }


}
