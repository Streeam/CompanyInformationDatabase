package com.streeam.cid.web.rest;

import com.streeam.cid.domain.Company;
import com.streeam.cid.domain.Employee;
import com.streeam.cid.domain.User;
import com.streeam.cid.repository.AuthorityRepository;
import com.streeam.cid.security.AuthoritiesConstants;
import com.streeam.cid.security.SecurityUtils;
import com.streeam.cid.service.CompanyService;
import com.streeam.cid.service.MailService;
import com.streeam.cid.service.dto.CompanyDTO;
import com.streeam.cid.service.mapper.CompanyMapper;
import com.streeam.cid.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.streeam.cid.domain.Company}.
 */
@RestController
@RequestMapping("/api")
public class CompanyResource {

    private final Logger log = LoggerFactory.getLogger(CompanyResource.class);

    private static final String ENTITY_NAME = "company";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompanyService companyService;

    private final MailService mailService;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    private AuthorityRepository authorityRepository;

    public CompanyResource(CompanyService companyService, MailService mailService) {
        this.companyService = companyService;
        this.mailService = mailService;
    }

    /**
     * {@code POST  /companies} : Create a new company.
     *
     * @param companyDTO the companyDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new companyDTO, or with status {@code 400 (Bad Request)} if the company has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/companies")
    public ResponseEntity<CompanyDTO> createCompany(@Valid @RequestBody CompanyDTO companyDTO) throws URISyntaxException {
        log.debug("REST request to save Company : {}", companyDTO);
        if (companyDTO.getId() != null) {
            throw new BadRequestAlertException("A new company cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (companyService.companyEmailAlreadyExists(companyDTO.getEmail())) {
            throw new BadRequestAlertException("This company email is already being used", ENTITY_NAME, "emailexists");
        }
        if (companyService.companyNameAlreadyExists(companyDTO.getName())) {
            throw new BadRequestAlertException("This company name is already being used", ENTITY_NAME, "emailexists");
        }
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User user = companyService.findCurrentUser(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee employee = companyService.findEmployeeFromUser(user).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));

        List<CompanyDTO> companies = companyService.findAll();
        if (!companies.isEmpty()) {
            throw new BadRequestAlertException("A company already exist. You cannot create another company.", ENTITY_NAME, "wrongroleforcreatingcompany");
        }
        if (companyService.checkUserHasRoles(user, AuthoritiesConstants.EMPLOYEE, AuthoritiesConstants.ADMIN, AuthoritiesConstants.ANONYMOUS)) {
            throw new BadRequestAlertException("Only the manager can create a company.", ENTITY_NAME, "wrongroleforcreatingcompany");
        }

        CompanyDTO result = companyService.saveCompany(companyDTO, employee, user);

        return ResponseEntity.created(new URI("/api/companies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /companies} : Updates an existing company.
     *
     * @param companyDTO the companyDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated companyDTO,
     * or with status {@code 400 (Bad Request)} if the companyDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the companyDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/companies")
    public ResponseEntity<CompanyDTO> updateCompany(@Valid @RequestBody CompanyDTO companyDTO) throws URISyntaxException {
        log.debug("REST request to update Company : {}", companyDTO.getName());
        CompanyDTO result;
        if (companyDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Optional<Company> companyToModify = companyService.findCompanyById(companyDTO.getId());
        if (!companyToModify.isPresent()) {
            throw new BadRequestAlertException("No company found with the id: " + companyDTO.getId(), ENTITY_NAME, "nocompanyfound");
        }
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        User currentUser = companyService.findCurrentUser(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        Employee currentEmployee = companyService.findEmployeeFromUser(currentUser).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "No employee linked to this user"));

        if (!companyService.checkUserHasRoles(currentUser, AuthoritiesConstants.ADMIN, AuthoritiesConstants.MANAGER)) {
            throw new BadRequestAlertException("You don't have the authority to modify the details of the company", ENTITY_NAME, "noauthoritytochangecomp");
        }

        result = companyService.save(companyDTO);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, companyDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /companies} : get all the companies.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of companies in body.
     */
    @GetMapping("/companies")
    public List<CompanyDTO> getAllCompanies() {
        log.debug("REST request to get all Companies");
        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        companyService.findCurrentUser(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        return companyService.findAll();
    }

    /**
     * {@code GET  /companies/:id} : get the "id" company.
     * @param id the id of the companyDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the companyDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/companies/{id}")
    public ResponseEntity<CompanyDTO> getCompany(@PathVariable Long id) {
        log.debug("REST request to get Company : {}", id);
        Optional<CompanyDTO> companyDTO = companyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(companyDTO);
    }

    /**
     * {@code DELETE  /companies/:id} : delete the "id" company.
     *
     * @param id the id of the companyDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/companies/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        log.debug("REST request to delete Company : {}", id);

        String currentUserLogin = SecurityUtils.getCurrentUserLogin().get();

        Company companyToDelete = companyService.findCompanyById(id).orElseThrow(() ->
            new BadRequestAlertException("No company with this id found.", ENTITY_NAME, "nocompwithid"));

        User currentUser = companyService.findCurrentUser(currentUserLogin).orElseThrow(() ->
            new BadRequestAlertException("No user logged in", ENTITY_NAME, "No user logged in"));

        companyService.findEmployeeFromUser(currentUser).orElseThrow(() ->
            new BadRequestAlertException("No employee linked to this user", ENTITY_NAME, "userwithnoemployee"));

        if (!companyService.checkUserHasRoles(currentUser, AuthoritiesConstants.MANAGER, AuthoritiesConstants.ADMIN)) {
            throw new BadRequestAlertException("You don't have the authority to delete this company", ENTITY_NAME, "companyremoveforbiden");
        }
         companyService.delete(companyToDelete);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

}
